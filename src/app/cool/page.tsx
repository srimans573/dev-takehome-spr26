import Image from "next/image";
import Link from "next/link";

export default function Kewl() {
  return (
    <div
      className="min-h-screen flex flex-row justify-between text-gold gap-5 p-10"
      style={{
        backgroundColor: "#003057",
        color: "#B3A369",
        fontWeight: "bold",
      }}
    >
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
      <div className="">
        <h1>What's up! My name is Sriram :)</h1>
        <p className="my-5">
          First Year Computer Science @{" "}
          <span className="bg-white p-1.5">
            Georgia Institute of Technology
          </span>
        </p>
        <div className="flex flex-col gap-3">
          <li>
            I'm from Fremont, California. It's about a five hour flight trip
            from the BIG ATL 🦅🦅🦅
          </li>
          <li>
            Fun facts: I can juggle fruits, perform a handstand (kinda), and
            sleep for an entire day (24 hrs!)
          </li>
          <li>
            Made{" "}
            <Link
              href="https://app.cookr.co"
              className="bg-white p-1.5"
            >
              an EdTech platform
            </Link>{" "}
            serving over 80k students.
          </li>
          <li>49ers fan.</li>
        </div>
      </div>
    </div>
  );
}
