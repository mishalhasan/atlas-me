import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs.jsx";
import SignIn from "@/components/home/SignIn";
import SignUp from "@/components/home/SignUp";

function Home() {
  const [tab, setTab] = useState("sign-in");
  const [errors, setErrors] = useState({});

  return (
    <>
      <div
        className="bg-atlas-map-bg w-screen h-screen flex items-center justify-center"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(212,168,67,0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(212,168,67,0.15) 1px, transparent 1px)
      `,
          // backgroundSize: "150px 150px",
          backgroundSize: "150px 170px",
        }}
      >
        <Card className="w-[350px] flex flex-col ">
          <CardHeader>
            <CardTitle className="text-center font-playfair text-2xl">
              AtlasMe
            </CardTitle>

            <CardDescription className="text-center">
              {tab === "sign-in"
                ? "Your map is waiting."
                : "Your atlas begins here."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs
              value={tab}
              onValueChange={(val) => {
                setTab(val);
                setErrors({});
              }}
              className="min-h-[460px] w-[290px] flex flex-col"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4 ">
                <TabsTrigger
                  className="data-[state=active]:bg-atlas-map-bg data-[state=active]:text-white"
                  value="sign-in"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-atlas-map-bg data-[state=active]:text-white"
                  value="sign-up"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="flex flex-col flex-1">
                <SignIn setTab={setTab} errors={errors} setErrors={setErrors} />
              </TabsContent>

              <TabsContent value="sign-up" className="flex flex-col flex-1">
                <SignUp setTab={setTab} errors={errors} setErrors={setErrors} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Home;
