import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function BarChartBox({ data=[] }) { const chartData = data.map(d=>({ skill: d.skill, level: d.level||d.value||0 })); return (<div className='glass p-4 rounded-xl h-64'><h4 className='font-semibold mb-2'>Skill Levels</h4><ResponsiveContainer width='100%' height='87%'><BarChart data={chartData}><XAxis dataKey='skill'/><YAxis domain={[0,10]}/><Tooltip/><Bar dataKey='level' /></BarChart></ResponsiveContainer></div>); }
