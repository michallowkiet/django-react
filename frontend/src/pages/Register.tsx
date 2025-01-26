import Form from "../components/Form";

const Register = () => {
  return (
    <div>
      <Form
        route="/api/user/register/"
        type="register"
      />
    </div>
  );
};

export default Register;
