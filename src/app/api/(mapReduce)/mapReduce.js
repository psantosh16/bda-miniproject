var mapFunction = function () {
  emit(this.status, 1);
};

var reduceFunction = function (keyStatus, values) {
  return Array.sum(values);
};

db.sentiment.mapReduce(
    mapFunction,
    reduceFunction,
    {
  out: "sentiment_counts",
    },
);

db.sentiment_counts.find().pretty();
