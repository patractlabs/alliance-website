console.log('process.env.REACT_APP_NODE_ENV', process.env.REACT_APP_NODE_ENV, process.env);
export const config = {
  decimal: process.env.REACT_APP_NODE_ENV === 'development' ? 12 : 10,
  graphqlUrl:
    process.env.REACT_APP_NODE_ENV === 'development'
      ? 'https://api.alliance.patract.io/graphql'
      : 'https://api.alliance.patract.io/graphql'
};
