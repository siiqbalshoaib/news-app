import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    // console.log("i am a constructor");
    this.state = {
      articles: [],
      loading: false,
    }
  }
  async componentDidMount() {
    // console.log("i am cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=89c3beda94b840ba93af4ea7bb73039d&page=1&pageSize=3";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }
   handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=89c3beda94b840ba93af4ea7bb73039d&page=${
      this.state.page-1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
    })
  };
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=89c3beda94b840ba93af4ea7bb73039d&page=${
      this.state.page+1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    })
  };
 
  render() {
    return (
      <div className="container  my-4">
        <h1> NewsMonkey--Top Healines </h1>
        <div className="row my-3">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://images.livemint.com/img/2023/11/14/1140x641/Pandoras_Cluster_Abell_2744_1699944827059_1699944842482.jpg"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className=" container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Prev
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
