import axios from 'axios';

const request = axios.create({
	withCredentials: true,
});
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const setSelectedRegion = async (selectedRegion) => {
	try {
		const response = await request.put(
			`${SERVER_URL}/user/selectedRegion`,
			selectedRegion
		);
		return response.data;
	} catch (error) {
		return undefined;
	}
};

export const getSelectedRegion = async () => {
  try {
		const response = await request.get(
			`${SERVER_URL}/user/selectedRegion`
		);
		return response.data;
	} catch (error) {
		return undefined;
	}
};