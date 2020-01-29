const app = require("../app");
const { expect } = require("chai");
const supertest = require("supertest");

describe("GET /apps test", () => {
  // test for happy case
  it("should get a 200 response", () => {
    supertest(app)
      .get("/app")
      .expect(200);
  });

  // test for query parameter
  it("should be a query parameter", () => {
    supertest(app)
      .get("/apps")
      .query({ rating: 3,
         genres: "Puzzle" })
      .then(res => {
        expect(res.body).to.include('"Genres": "Puzzle"');
      });
  });

  // Validation test
  it("should sort by Rating", () => {
    supertest(app)
      .get("/app")
      .query({ Rating: "number" })
      .expect(200);
    // .expect("Content", /json/)
    // .then(res => {
    //   expect(res.body).to.be.an("array");
    //   let i = 0;
    //   let sorted = true;
    //   while (sorted && i < res.body.length - 1) {
    //     sorted = sorted && res.body[i].Rating < res.body[i + 1].Rating;
    //     i++;
    //   }
    //   expect(sorted).to.be.true;
    // });
  });
});
