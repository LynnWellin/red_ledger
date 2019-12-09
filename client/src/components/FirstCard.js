import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton, Button } from '@material-ui/core';
import SummaryItem from './SummaryItem';

const cardImage = '/images/icons8-card-payment-80.png';
const recordImage = '/images/icons8-book-and-pencil-100.png';
const analyzeImage = '/images/icons8-analyze-80.png';
// #C9D6EA

const useStyles = makeStyles({
    pageTitle: {
        fontSize: '4em',
    },
    pageTitleMobile: {
        fontSize: '3em',
    },
    presentation: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        '& label': {
            color: 'white',
            fontSize: '1.2em',
        },
    },
    firstCard: {
        position: 'relative',
        background: 'linear-gradient(#96C3CE,#73C1C6)',
        // height: window.innerHeight,
        padding: '10px',
    },
    firstCardBackground: {
        borderRadius: '3px',
        position: 'absolute',
        background: 'linear-gradient(#FFA552,#BA5624)',
        // background: '#663F46',
        zIndex: -1,
        top: '-8px',
        left: '-8px',
    },
    firstDeskopt: {
        borderRadius: '2px',
        boxShadow: '5px 5px 5px #1A444F',
        margin: '25px',
    },
    more: {
        background: '#BA5624',
        color: 'black',
    },
    summary: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: '10px',
    },
});

function FirstCard() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            // clean up function
            window.removeEventListener('resize', handleResize);
        };
    });

    const classes = useStyles();
    return (
        <div
            className={clsx(
                classes.presentation,
                classes.firstCard,
                window.innerWidth > 600 && classes.firstDeskopt
            )}
            style={{ height: screenHeight - (screenWidth > 600 ? 50 : 0) }}
        >
            <div className={classes.summary}>
                {screenWidth > 600 ? (
                    <div
                        className={classes.firstCardBackground}
                        style={{ height: screenHeight - 50, width: screenWidth - 75 }}
                    />
                ) : null}
                <h1
                    className={clsx(
                        classes.pageTitle,
                        window.innerWidth < 601 ? classes.pageTitleMobile : null
                    )}
                >
                    Ledger A
                </h1>
                <SummaryItem image={cardImage} imageAlt="Credit Card" label="Spend" />
                <SummaryItem image={recordImage} imageAlt="Notebook" label="Log" />
                <SummaryItem image={analyzeImage} imageAlt="Analyze" label="Analyze" />
                <Button
                    href="/users/register"
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                >
                    Register
                </Button>
            </div>
            <IconButton className={classes.more}>
                <ExpandMoreIcon
                    fontSize={screenWidth > 600 ? 'medium' : 'small'}
                    onClick={() =>
                        window.scrollTo({
                            top: screenHeight,
                            behavior: 'smooth',
                        })
                    }
                />
            </IconButton>
        </div>
    );
}

export default FirstCard;
