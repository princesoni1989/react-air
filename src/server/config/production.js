const prodConfig = {
  port: process.env.PORT || 8080,
  mongo: {
    url: 'mongodb://localhost/reactboilerplate',
    options: {}
  },
}

export default prodConfig;
