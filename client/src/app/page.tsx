"use client"

import Header from "@/components/Header";
import LinkDetailsComponent from "@/components/LinkDetailsComponent";
import LinkDetails from "@/interfaces/LinkDetails";
import { useState } from "react";

export default function Home() {

const [linkDetails, setLinkDetails]  = useState<LinkDetails>({
    numberOfLinks: undefined,
    brokenLinks: [],
    error: false
})

return (
    <main>
      <body>
        <div className="header">
          <Header linkDetails={linkDetails} setLinkDetails={setLinkDetails}/>
          <LinkDetailsComponent linkDetails={linkDetails}/>
        </div>
      </body>
    </main>
  )
}

