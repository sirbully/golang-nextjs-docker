import React from "react"
import { MessageBoard } from "../components/MessageBoard"
import { Tab } from "../components/Tab"

const Index = () => (
    <div className="container mx-auto p-6">
      <p className="font-bold text-3xl mb-4 md:hidden sm:block">
        message board.
      </p>
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-8 col-span-12 md:order-first order-last">
          <MessageBoard />
        </div>
        <div className="md:col-span-4 col-span-12 md:order-last order-first">
          <Tab />
        </div>
      </div>
    </div>
  )

export default Index
