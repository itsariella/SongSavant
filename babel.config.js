module.exports = function override(api) {

    var env = api.cache(() => process.env.NODE_ENV);
    var isProd = api.cache(() => process.env.NODE_ENV === "production");
  
    if (!isProd) {
      config = {
        plugins: [
          ["transform-remove-console"]
        ],
        presets: ["@babel/preset-flow", "module:metro-react-native-babel-preset"]
      };
    }
  
    return config;
  };