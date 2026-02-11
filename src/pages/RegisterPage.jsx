import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* Bisa tambahkan header atau logo */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Our Platform</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Create your account to get started</p>
      </header>

      {/* Form Register */}
      <RegisterInput />

      {/* Footer opsional */}
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</footer>
    </div>
  );
}

export default RegisterPage;
