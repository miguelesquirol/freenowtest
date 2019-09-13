import React from 'react';

const Post = ({ body }) => {
  return (
    <div>
      {body.map(post => {
        const { _id, title, content } = post;
        return (
          <div key={_id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export class App extends React.Component {
  state = {
    isLoading: true,
    posts: [],
    error: null,
  };
  fetchPosts() {
    fetch(`https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json`)
      .then(response => response.json())
      .then(
        data =>
          this.setState({
            posts: data,
            isLoading: false,
          })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    const { isLoading, posts, error } = this.state;
    return (
      <React.Fragment>
        <h1>React Fetch - Blog</h1>
        <hr />
        {!isLoading ? Object.keys(posts).map(key => <Post key={key} body={posts[key]} />) : <h3>Loading...</h3>}
      </React.Fragment>
    );
  }
}
