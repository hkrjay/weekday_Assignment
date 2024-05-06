import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, Icon, Link, Stack } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function JobCard({ data }) {

    return (
        <Card sx={{ maxWidth: 345, padding: 2, borderRadius: '20px' ,boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;' }}>
            <Stack direction="row" spacing={1}>
                <Chip
                    icon={<HourglassTopIcon />}
                    label="Posted 10 Days ago"
                    variant="outlined"
                    size="small"
                />
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ padding: '10px 0px 10px 10px' }}>
                <Typography variant="span" component="span">
                    <img src={data.logoUrl} alt={data?.companyName} style={{ height: '50px' }} />
                </Typography>
                <Stack direction={"column"} spacing={0.5}>
                    <Typography variant="span" component="span" align='left'>
                        {data?.companyName}
                    </Typography>
                    <Typography variant="span" component="span" align='left'>
                        {data?.jobRole}
                    </Typography>
                    <Typography variant="span" component="span" sx={{ marginTop: '10px' }}>
                        {data?.location}
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} sx={{paddingBottom: '20px'}}>
                <Typography variant="span" component="span">
                    Estimated Salary: <CurrencyRupeeIcon color="disabled" sx={{ fontSize: 20 }} />{data?.minJdSalary}-{data?.maxJdSalary} LPA
                </Typography>
            </Stack>

            <Stack sx={{ position: 'relative' }} align="left">
                <Typography variant="h6" component="h2">
                    About Company:
                </Typography>
                <Typography variant="span" component="h2">
                    About Us
                </Typography>

                <Typography variant="body2" color="text.secondary" className='jobContent'>
                    {data?.jobDetailsFromCompany}
                </Typography>
            </Stack>
            <Link href={data.jdLink} underline="none">View Job</Link>
            <Stack direction={"column"} spacing={.5} align="left" sx={{ marginBottom: '15px' }}>
                <Typography>
                    Minimum Experience
                </Typography>
                <Typography>
                    {data.minExp} Years
                </Typography>
            </Stack>

            <Stack direction={"column"} spacing={1}>
                <Button variant="contained" startIcon={<ElectricBoltIcon />} sx={{ backgroundColor: "#54efc3", color: '#000' }}>
                    Easy Apply
                </Button>
                <Button variant="contained" startIcon={<AccountCircleIcon />} sx={{backgroundColor: "#4943da"}}>
                    Unlock Referral Code
                </Button>
            </Stack>
        </Card>
    );
}
