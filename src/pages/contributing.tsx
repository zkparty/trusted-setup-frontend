import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { Description, PageTitle } from '../components/Text'

const ContributingPage = () => {

  const [step, setStep] = useState('started');
  // started, downloaded, contributed, uploaded, verified, error

  const download = async () => {
    const transcript = await fetch('./initialContribution.json').then(_res => _res.json());
    const transcriptString = JSON.stringify(transcript);
    setStep('downloaded');
    return transcriptString;
  }

  const contribute = (transcript: string) => {
    const worker = new Worker('./wasm/wasm-worker.js', {
      type: 'module'
    });
    const data = JSON.stringify({
      transcript: transcript,
      entropy: 'input entropy here',
    });
    // start worker
    worker.postMessage(data);
    return worker;
  }

  const upload = (worker: Worker) => {
    worker.onmessage = async (event) => {
      setStep('contributed');
      console.log(event.data);
      await fetch('/contribution/complete',{
        method: 'POST',
        body: JSON.stringify({ transcript: event.data }),
      }).then(_res => _res.json());
      setStep('uploaded');
    };
  }

  useEffect(() => {
    (async () => {
      try {
        const transcript = await download();
        const worker = contribute(transcript);
        upload(worker);
      } catch (error) {
        console.log(error);
        setStep('error');
      }
    })();
  }, []);

  return (
    <Container>
      <Header />
      <PageTitle>Magic math & you.</PageTitle>
      <Description>Contribution active...</Description>
      <Description>Do not close browser</Description>
      {step === 'started' ? <Description>Downloading...</Description> : ''}
      {step === 'downloaded' ? <Description>Contributing...</Description> : ''}
      {step === 'contributed' ? <Description>Uploading...</Description> : ''}
      {step === 'uploaded' ? <Description>Contribution completed</Description> : ''}
      {step === 'error' ? <Description>There was an error. Reload and try again</Description> : ''}
    </Container>
  )
}

const Container = styled.section`
  padding: 0 24px 24px;
`

export default ContributingPage
