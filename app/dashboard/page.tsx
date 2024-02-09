import { auth, signOut } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const user = await auth();
  console.log(user);

  return (
    <main>
      <p>Welcome, {user?.user?.name}</p>
      <LogoutButton>
        <Button variant="outline">Sign out</Button>
      </LogoutButton>
    </main>
  );
}
