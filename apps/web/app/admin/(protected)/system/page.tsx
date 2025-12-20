import prisma from "../../../../lib/prisma";

export default async function SystemPage() {
  const dbUsers = await prisma.user.count();
  const dbOrgs = await prisma.yellowBookEntry.count();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">System info</h1>
      <p className="mt-1 text-sm text-slate-400">Runtime + quick checks</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-slate-300">Node version</div>
          <div className="mt-2 text-xl text-white">{process.version}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-slate-300">Database counters</div>
          <div className="mt-2 text-white">Users: {dbUsers}</div>
          <div className="text-white">Organizations: {dbOrgs}</div>
        </div>
      </div>
    </div>
  );
}
