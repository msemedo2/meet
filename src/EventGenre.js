import React, { useState, useEffect } from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
	const [data, setData] = useState([]);
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#6a0dad'];

	useEffect(() => {
		setData(() => getData());
	}, [events]);

	const getData = () => {
		const genres = ['React', 'Angular', 'JavaScript', 'Node', 'jQuery'];

		const data = genres.map((genre) => {
			const value = events.filter((event) =>
				event.summary.includes(genre)
			).length;
			return { name: genre, value };
		});
		return data;
	};

	return (
		<ResponsiveContainer height={400} width={'100%'}>
			<PieChart height={400} width={400}>
				<Pie
					data={data}
					cx={200}
					cy={200}
					labelLine={false}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
					label={({ name, percent }) => {
						if (percent > 0) {
							return `${name} ${(percent * 100).toFixed(0)}%`;
						}
					}}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenre;
