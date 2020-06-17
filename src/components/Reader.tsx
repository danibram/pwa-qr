import {
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Paper,
    Select,
} from "@material-ui/core";
import * as ZXing from "@zxing/library";
import React, { useEffect, useState } from "react";

export default () => {
    let [devices, setDevices] = useState([]);
    let [device, setDevice] = useState("");
    let [result, setResult] = useState({});

    const codeReader = new ZXing.BrowserQRCodeReader();

    const handleChange = (event) => {
        console.log(event.target.value);
        setDevice(event.target.value);
    };

    const scan = (event) => {
        codeReader
            .decodeOnceFromVideoDevice(device, "video")
            .then((result) => {
                console.log(result);
                setResult(result);
            })
            .catch((err) => {
                console.error(err);
            });

        console.log(`Started continous decode from camera with id ${device}`);
    };

    useEffect(() => {
        const start = async () => {
            let videoInputDevices = await codeReader.listVideoInputDevices();

            setDevices(videoInputDevices);

            videoInputDevices.forEach((device) => console.log(device));
        };

        try {
            start();
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                <Box my={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <video
                                id="video"
                                style={{
                                    width: "100%",
                                }}
                            ></video>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}
                                value={device}
                            >
                                {devices.map((d, i) => (
                                    <MenuItem
                                        key={d.deviceId}
                                        value={d.deviceId}
                                    >
                                        {d.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={scan}>Scan</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                style={{
                                    zIndex: 99999999999999999999999999999,
                                }}
                            >
                                <pre>{JSON.stringify(result)}</pre>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};
