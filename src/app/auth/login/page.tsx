import LoginForm from "@/components/forms/LoginForm";
import Procu from "@/components/shared/Procu";

function LoginPage() {
  return (
    <div className=" flex items-center">
      <div className="flex-grow">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
