import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"

export default function Page() {
  return (
    <>
      <UserButton />
      <OrganizationSwitcher hidePersonal />
    </>
  )
}
