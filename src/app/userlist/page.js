import { dbConnect } from "@/utils/dbConnection";
import RadixButton from "@/components/RadixButton";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
export default async function AppUserList() {
  const { userId } = auth();
  const db = dbConnect();
  const response = await db.query(`
        SELECT * FROM socialmedia_users
        `);
  const userList = response.rows;
  console.log(userList);
  return (
    <main>
      <Link id="profilelink" href={`/user/${userId}`}>
        My profile
      </Link>
      <div id="mdiv">
        <ul>
          <li>List of our users:</li>
          <RadixButton />
          {userList.map((item) => (
            <li key={item.id}>
              <Link id="userlistbut" href={`/view/${item.username}`}>
                {item.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
