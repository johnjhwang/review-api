const db = require('./index.js');


module.exports = {
  get: function (product_id, sort='newest', callback) { // match the shape, process photos separately
    let result = {};
    let sortKeyword = '';
    if (sort === 'newest') {
      sortKeyword = 'date';
    } else {
      sortKeyword = 'helpfulness';
    }
    result.product_id = product_id; // passed in in string form already, perhaps this is why original API did the same thing
    db.queryAsync(`SELECT review_id, rating, date, summary, body, recommend, reviewer_name, response, helpfulness FROM Reviews WHERE product_id = ${product_id} AND reported = 0 ORDER BY ${sortKeyword} DESC`)
      .then((responseData) => {
        result.results = responseData[0];
        return db.queryAsync(` SELECT p.*, r.product_id FROM photos as p INNER JOIN Reviews as r ON p.review_id = r.review_id WHERE r.product_id = ${product_id};`);
      })
      .then((photos) => { // [0] is dataset, [0][i] is entry
        // console.log('photos[0][0] query >>>>>', photos[0][0]);
        result.results.map((review) => {
          review.photos = [];
          photos[0].map(photo => {
            if (review.review_id === photo.review_id) {
              let eachPhoto = {'id': photo.id, 'url': photo.url};
              review.photos.push(eachPhoto);
            }
          });
        });
        callback(null, result);
      })
      .catch(err => {
        callback(err, result);
      });
  },

  getMeta: function (product_id, callback) { // build sub-objects separately
    let result = {};
    let characteristics = {};
    let recommended = {};
    let ratings = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    };
    result.product_id = product_id; // passed in in string form
    db.queryAsync(`SELECT COUNT(*) FROM Reviews WHERE product_id=${product_id} AND recommend = 1`)
      .then((responseData) => {
        recommended['true'] = responseData[0][0]['COUNT(*)'];
        return db.queryAsync(`SELECT COUNT(*) FROM Reviews WHERE product_id=${product_id} AND recommend = 0`);
      })
      .then((responseData) => {
        recommended['false'] = responseData[0][0]['COUNT(*)'];
        result.recommended = recommended;
        return db.queryAsync(`SELECT rating FROM Reviews WHERE product_id=${product_id}`);
      })
      .then((allRatings) => { // [0] is dataset, each array element are objects
        // console.log('allRatings[0] query >>>>>', allRatings[0]);
        allRatings[0].map((eachRating) => {
          ratings[eachRating.rating] += 1;
        });
        result.ratings = ratings;
        return db.queryAsync(`SELECT c.*, cR.* FROM characteristics as c INNER JOIN charReviews as cR ON c.characteristic_id = cR.characteristic_id WHERE c.product_id=${product_id};`);
      })
      .then((allChars) => { // [0] is dataset, [0][i] individual
        console.log('characteristics[0] query >>>>>', allChars[0]);
        let count = 0;
        let total = 0;
        characteristics[allChars[0][0].name] = {'id': allChars[0][0].characteristic_id, 'value': 0};
        allChars[0].map((eachChar, i) => {

          if (characteristics[eachChar.name] === undefined) {
            let final = total / count;
            characteristics[allChars[0][i - 1].name].value = final;
            count = 0;
            total = 0;
            characteristics[eachChar.name] = {'id': eachChar.characteristic_id, 'value': 0};
            count++;
            total += eachChar.value;
          } else if (i === allChars[0].length - 1) {
            count++;
            total += eachChar.value;
            let final = total / count;
            characteristics[allChars[0][i].name].value = final;
          } else {
            count++;
            total += eachChar.value;
          }
        });
        result.characteristics = characteristics;
        callback(null, result);
      })
      .catch(err => {
        callback(err, result);
      });
  },

  post: function (body, callback) {
    const currentDate = new Date(); // grab current time and date
    db.queryAsync(`INSERT INTO Reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response) VALUES (${body.product_id}, ${body.rating}, '${currentDate}', '${body.summary}', '${body.body}', ${body.recommend}, 0, '${body.name}', '${body.email}', null)`)
      .then(() => {
        callback(null);
      })
      .catch(err => {
        console.log('error posting review >>>>', err);
        callback(err);
      })
  },

  update: function (review_id, action, callback) { // mark review as helpful and report review (PUT /reviews/:review_id/helpful) (PUT /reviews/:review_id/report)
    if (action === 'report') {
      db.queryAsync(`UPDATE Reviews SET reported = 1 WHERE review_id = ${review_id}`)
      .then(() => {
        callback(null);
      })
      .catch(err => {
        console.log('error marking review as reported');
        callback(err);
      })
    } else if (action === 'helpful') {
      db.queryAsync(`UPDATE Reviews SET helpfulness = helpfulness + 1 WHERE review_id=${review_id}`)
      .then(() => {
        callback(null)
      })
      .catch(err => {
        console.log('error marking review as helpful');
        callback(err);
      });
    }

  }

}

