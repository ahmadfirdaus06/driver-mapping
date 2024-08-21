import axios from "axios";
import { Button, Card, Label, RangeSlider } from "flowbite-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

function App() {
	const [driversCount, setDriversCount] = useState(1);
	const [position, setPosition] = useState({
		latitude: 37.394,
		longitude: 127.11,
	});
	const [drivers, setDrivers] = useState(
		[] as {
			driver_id: string;
			location: { latitude: number; longitude: number };
		}[]
	);

	const getDrivers = async () => {
		try {
			const response = await axios(`/api/drivers?count=${driversCount}`);
			const data: {
				center_point: { latitude: number; longitude: number };
				drivers: {
					driver_id: string;
					location: { latitude: number; longitude: number };
				}[];
			} = response.data.data;

			setPosition({
				latitude: data.center_point.latitude,
				longitude: data.center_point.longitude,
			});
			setDrivers(data.drivers);
		} catch (error) {
			console.error(error);
			return;
		}
	};

	useEffect(() => {
		getDrivers();
	}, []);

	return (
		<MapContainer
			center={[position.latitude, position.longitude]}
			zoom={15}
			maxZoom={18}
			minZoom={10}
			className="h-full w-full"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[position.latitude, position.longitude]}>
				<Popup />
				<Tooltip direction="top" permanent>
					<p className="text-center font-bold">
						You are here !<br />
						(Kakao Pangyo Office)
					</p>
				</Tooltip>
			</Marker>

			{drivers.map((driver) => (
				<Marker
					key={driver.driver_id}
					position={[driver.location.latitude, driver.location.longitude]}
				>
					<Popup>
						<p className="text-center font-bold">{driver.driver_id}</p>
					</Popup>
				</Marker>
			))}
			<div
				style={{ zIndex: 9999999999999 }}
				className="lg:w-[400px] lg:ml-auto lg:mr-auto right-0 left-0 absolute bottom-0 m-[12px] flex flex-col justify-center gap-[12px]"
			>
				<Card>
					<div className="flex flex-col justify-center items-center gap-[12px]">
						<Label className="text-black">{driversCount} Driver(s)</Label>
						<RangeSlider
							className="w-full"
							defaultValue={driversCount}
							max={50}
							min={1}
							onChange={(e) => setDriversCount(parseInt(e.currentTarget.value))}
						/>
					</div>
					<Button onClick={getDrivers}>Get Drivers</Button>
				</Card>
			</div>
		</MapContainer>
	);
}

export default App;
