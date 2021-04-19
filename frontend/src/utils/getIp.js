import publicIp from 'public-ip';

const publicIpData = async () => {
    const ip = await publicIp.v4();
    console.log('ip generated... ', ip)
    return ip;
}

export default publicIpData;