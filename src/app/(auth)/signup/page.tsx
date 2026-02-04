import SignupForm from '@/components/pages/signup/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex w-full flex-col items-center bg-gray-50">
      <h1 className="text-title-lg mt-20">회원가입</h1>
      <SignupForm />
    </div>
  );
}
