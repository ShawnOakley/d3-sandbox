import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import PieClass from "./PieClass";

function Display() {
    const generateData = (value, length = 5) =>
        d3.range(length).map((item, index) => ({
            date: index,
            value: value === null || value === undefined ? Math.random() * 100 : value
        }))

    const [data, setData] = useState(generateData());

    const changeData = () => {
        setData(generateData())
    }

    return (
        <div className="Display">
            <div>
                <button onClick={changeData}>Transform</button>
            </div>
            <div>
                <span className="label">React Class</span>
                <PieClass
                data={data}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}
                />
            </div>
            {/* <div>
                <span className="label">Hooks</span>
                <PieHooks
                data={data}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}
                />
            </div>
            <div>
                <span className="label">SVG Elements</span>
                <PieSVG
                data={data}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}
                />
            </div>         */}
        </div>
    );
}

export default Display;
