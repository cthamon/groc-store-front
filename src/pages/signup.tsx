import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, Input, Button, Paper } from '@material-ui/core';

import { Layout, Loading } from '../components';
import { useRegister } from '../services/query';
import useStyles from '../styles/material-ui/style';

import { UserRegisType } from '../types';

const SignUp = () => {
    const router = useRouter();
    const { mutate, isLoading, error, isSuccess } = useRegister();

    const [input, setInput] = useState<UserRegisType>({});
    const [file, setFile] = useState(null);

    const classes = useStyles();

    const handleInputChange = (e: { target: { id: string; value: string; }; }) => {
        const { id, value } = e.target;
        setInput(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, confirmPassword, firstName, lastName, address } = input;
        const formData = new FormData();
        formData.append('email', email as any);
        formData.append('password', password as any);
        formData.append('confirmPassword', confirmPassword as any);
        formData.append('firstName', firstName as any);
        formData.append('lastName', lastName as any);
        formData.append('address', address as any);
        formData.append('profile', file as any);
        mutate(formData);
    };

    let profileImage;
    if (file) {
        profileImage = URL.createObjectURL(file);
    }

    if (isLoading) return <Loading />;
    if (isSuccess) router.push("/cart");

    return (
        <Layout>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input
                                id="email"
                                type="email"
                                value={input.email}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type="password"
                                value={input.password}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={input.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="firstName">First name</InputLabel>
                            <Input
                                id="firstName"
                                type="text"
                                value={input.firstName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="lastName">Last name</InputLabel>
                            <Input
                                id="lastName"
                                type="text"
                                value={input.lastName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <Input
                                id="address"
                                type="text"
                                value={input.address}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <div style={{ marginTop: '10px', display: 'flex' }}>
                            <input style={{ display: 'none' }} type="file" id="avatar" onChange={(e: any) => setFile(e.target.files[0])} />
                            <label style={{ borderRadius: '50%', padding: '0', width: '135px', height: '135px', margin: '0 auto' }} htmlFor="avatar">
                                <img style={{ borderRadius: '50%', width: '135px', height: '135px', border: '2px solid #ccc', padding: '3px', cursor: 'pointer' }} src={file ? profileImage : "/profile.png"} alt="profile" />
                            </label>
                        </div>
                        <Button type="submit" variant="contained" color="primary" className={classes.largeButton}>Register</Button>
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
                            {error &&
                                error.response.data.map((err: any, i: number) => (
                                    <p key={i} style={{ color: 'red', fontSize: '12px' }}>
                                        {err.message}
                                    </p>))
                            }
                        </div>
                    </form>
                </Paper>
            </main>
        </Layout>
    );
};

export default SignUp;