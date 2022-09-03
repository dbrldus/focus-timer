import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Parisienne", cursive;
`;

const Chart = styled.div`
  width: 900px;
  text-align: center;
`;

const BackLink = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  a {
    font-size: 30px;
    color: black;
    text-decoration: none;
  }
`;

const Title = styled.h1`
  font-size: 40px;
`;

interface Idata {
  date: string;
  time: number;
}
function Data() {
  const [data, setData] = useState<Array<Idata>>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem("Data") ?? "[]"));
    setLoading(false);
  }, []);

  return (
    <Wrapper>
      <BackLink>
        <Link to="/">Back</Link>
      </BackLink>
      {loading ? (
        ""
      ) : (
        <>
          <Chart>
            <Title>Minutes you Focused</Title>
            <ReactApexChart
              type="bar"
              series={[
                {
                  name: "Study",
                  data: data!.map((value) => Math.floor(value.time / 60)),
                },
              ]}
              options={{
                chart: {
                  type: "bar",
                },
                xaxis: {
                  categories: data!.map((value) => value.date),
                },
              }}
            />
          </Chart>
        </>
      )}
    </Wrapper>
  );
}

export default Data;
