import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, Input, FormHelperText, Button, Paper } from '@material-ui/core';

import { Layout, Loading } from '../components';
import { useLogin } from '../services/query';

import useStyles from '../styles/material-ui/style';

const SignIn = () => {
    const { mutate, isLoading, error, isSuccess } = useLogin();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    if (isLoading) return <Loading />;
    if (isSuccess) router.push("/cart");

    return (
        <Layout>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <form onSubmit={(e) => { e.preventDefault(); mutate({ email, password }); }}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input
                                id="email"
                                aria-describedby="email-text"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <FormHelperText id="email-text">try admin email &quot;c.tm@gmail.com&quot;</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                aria-describedby="password-text"
                                type="password"
                                value={password}

                                onChange={e => setPassword(e.target.value)}
                            />
                            <FormHelperText id="password-text">try admin password &quot;123abc&quot;</FormHelperText>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" className={classes.largeButton}>Login</Button>
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
                            No account ? <a style={{ color: '#3F51B5' }} href="" className="text-primary text-decoration-underline" onClick={() => router.push("/signup")}> Sign Up!</a>
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

export default SignIn;