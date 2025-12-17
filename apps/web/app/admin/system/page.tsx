export default function SystemInfoPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">System Info</h2>

      <ul className="list-disc pl-6">
        <li>Auth: NextAuth + GitHub OAuth</li>
        <li>DB: Prisma + SQLite</li>
        <li>Cluster: AWS EKS</li>
        <li>Ingress: ALB + TLS</li>
      </ul>
    </div>
  );
}
