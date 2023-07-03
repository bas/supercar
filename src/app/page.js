"use client";
import { withLDProvider } from "launchdarkly-react-client-sdk";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

const contexts = [
  {
    kind: "vehicle",
    key: "4Y1SL65848Z411001",
    brand: "Chrysler",
    model: "Voyager",
    region: "APAC",
  },
  {
    kind: "vehicle",
    key: "4Y1SL65848Z411002",
    brand: "Jeep",
    model: "Grand Cherokee",
    region: "Europe",
  },
  {
    kind: "vehicle",
    key: "4Y1SL65848Z411003",
    brand: "Chrysler",
    model: "300",
    region: "NA",
  },
  {
    kind: "vehicle",
    key: "4Y1SL65848Z411004",
    brand: "Fiat",
    model: "Panda",
    region: "APAC",
  },
  {
    kind: "vehicle",
    key: "4Y1SL65848Z411005",
    brand: "Jeep",
    model: "Wrangler",
    region: "NA",
  },
];

const defaultContext = {
  clientSideID: "",
  context: contexts[Math.floor(Math.random() * 5)],
  options: {
    bootstrap: "localStorage",
  },
  reactOptions: {
    useCamelCaseFlagKeys: true,
  },
};

function Home() {
  const [footer, setFooter] = useState("");

  // get the flag variation
  // client.variation('enablePayable', 0);
  const { enablePayable } = useFlags();

  // use the flag value
  const amountPayable = format(enablePayable);

  useEffect(() => {
    setFooter(
      `Region: ${defaultContext.context.region}, brand: ${defaultContext.context.brand}`
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Solitaire</h2>
          <p>Play Solitaire for {amountPayable}.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Memory</h2>
          <p>Play Memory for {amountPayable}.</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Snake</h2>
          <p>Play Snake for {amountPayable}.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Minesweeper</h2>
          <p>Play Minesweeper for {amountPayable}.</p>
        </a>
      </div>
      <p>{footer}</p>
    </main>
  );
}

function WithLDProviderContent({ children, context = defaultContext }) {
  context.clientSideID = "<CLIENT_SIDE_ID>";
  const Provider = withLDProvider(context)(Home);
  return <Provider>{children}</Provider>;
}

function format(amount) {
  if ((amount === 0)) return "free";
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export default WithLDProviderContent;
