import { PrismaClient } from "@prisma/client";
import ParagraphForm from "./components/ParagraphForm";

const prisma = new PrismaClient();

async function getIpAndCountry() {
  const ipResponse = await fetch("https://api.ipify.org?format=json", {
    cache: "no-store",
  });
  const ipData = await ipResponse.json();
  const ipAddress = ipData.ip;

  const countryResponse = await fetch(
    `https://ipapi.co/${ipAddress}/country_name/`,
    { cache: "no-store" }
  );
  const country = await countryResponse.text();

  return {
    ipAddress,
    country: country || "Unknown",
  };
}

async function getLatestParagraph() {
  const paragraph = await prisma.paragraph.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  return paragraph?.content || "No paragraph saved yet.";
}

export default async function Home() {
  const { ipAddress, country } = await getIpAndCountry();
  const paragraph = await getLatestParagraph();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        IP Country Paragraph App
      </h1>
      <div className="p-4 rounded-lg mb-8 shadow-md">
        <p className="mb-2">
          <strong className="text-blue-700">Your IP address:</strong>{" "}
          {ipAddress}
        </p>
        <p>
          <strong className="text-blue-700">Your country:</strong> {country}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Latest Paragraph:
        </h2>
        <p className="p-4 rounded-lg shadow border border-blue-200">
          {paragraph}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Update Paragraph:
        </h2>
        <ParagraphForm initialParagraph={paragraph} />
      </div>
    </div>
  );
}
