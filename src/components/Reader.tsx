import { Box, Container, Grid, MenuItem, Select } from "@material-ui/core";
import * as ZXing from "@zxing/library";
import React, { useEffect, useState } from "react";

export default () => {
    let [devices, setDevices] = useState([]);
    let [device, setDevice] = useState("");

    const codeReader = new ZXing.BrowserQRCodeReader();

    const handleChange = (event) => {
        console.log(event.target.value);
        setDevice(event.target.value);
        codeReader
            .decodeOnceFromVideoDevice(event.target.value, "video")
            .then((result) => console.log(result.text))
            .catch((err) => console.error(err));
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
        <Container maxWidth="sm">
            <video
                id="video"
                style={{
                    position: "fixed",
                    right: 0,
                    bottom: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                }}
            ></video>
            <Box my={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        QR
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            value={device}
                        >
                            {devices.map((d, i) => (
                                <MenuItem key={d.deviceId} value={d.deviceId}>
                                    {d.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
