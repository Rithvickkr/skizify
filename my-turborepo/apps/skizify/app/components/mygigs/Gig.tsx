import { BentoGrid, BentoGridItem } from "./Bentogrid";
import { Avatar } from "@repo/ui/avatar";
//This will fetch Data from DB

export default async function GigStructure({image}:{image : string}) {

  console.log(image);

  return (
    <div>
      <BentoGrid>
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
      </BentoGrid>
    </div>
  );
}
//TASK FOR LATER IS TO IMPORT THE AVATAR FROM THE DB

//getServerSideProps :-

// it runs on the server.
// it can only be exported from a page.
// it returns JSON.
