import Form from "../components/Form";

const Login = () => {
  return (
    <div>
      <Form
        route="api/token/"
        type="login"
      />
    </div>
  );
};

export default Login;
