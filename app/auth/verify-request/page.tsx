export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-punk-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm border-brutal border-neon-yellow p-8 bg-punk-gray-100 text-center">
        <h1 className="font-brutal text-brutal-2xl text-neon-yellow mb-4">
          CHECK EMAIL
        </h1>
        <p className="font-mono text-brutal-sm text-punk-white/70 mb-2">
          Magic link sent. Click it to sign in.
        </p>
        <p className="font-mono text-brutal-xs text-punk-white/30">
          // you can close this tab
        </p>
      </div>
    </div>
  );
}
