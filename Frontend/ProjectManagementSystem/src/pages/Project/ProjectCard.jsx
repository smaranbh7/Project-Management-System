import React from "react";
import { Card } from "../../components/ui/card";
import { DotFilledIcon } from "@radix-ui/react-icons";

function ProjectCard() {
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5"></div>
      <div className="space-y-2"></div>
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <h1 className="cursor-pointer font-bold text-lg">
            Create Ecommerce Project
          </h1>
          <DotFilledIcon />
          <p className="text-sm text-gray-5=400">FullStack</p>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
