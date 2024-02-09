import { auth } from "@/auth"

export default async function Dashboard() {
  const user = await auth()
  console.log(user)

  return (
    <main>
      Welcome, {user?.user?.name}
    </main>
  )
}