export function InfoItem({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="*:size-4 mt-0.5">{icon}</div>
      <div className="whitespace-pre-wrap">{children}</div>
    </div>
  )
}
