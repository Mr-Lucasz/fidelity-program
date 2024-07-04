// withDevTools.js
const withDevTools = (Component) => {
    // Implementação da função
    return (props) => <Component {...props} />;
  };
  
  export default withDevTools;