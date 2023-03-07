import styled from 'styled-components'
import { isMobile } from '../../utils'
import { FONT_SIZE } from '../../constants'
import Shield from '../../assets/shield.svg'
import { Trans, useTranslation } from 'react-i18next'

const OtherResources = () => {
    useTranslation()
    const mobile = isMobile()

    const onClickWriteYourOwn = () => {
        window.open("https://blog.ethereum.org/2022/12/15/kzg-ceremony-grants-round")
    }


    return (
    <Row isMobile={mobile}>
        <Col disabled={true}>
        </Col>
        <Col onClick={onClickWriteYourOwn}>
        <InternalCol>
            <Link>
                <Trans i18nKey="otherResources.writeYourOwn">
                    Learn more
                </Trans>
                { " " }
            </Link>
            <img src={Shield} alt="shield icon"/>
        </InternalCol>
        </Col>
        <Col disabled={true}>
        </Col>
    </Row>
    )
}

const Row = styled.div<{isMobile: boolean}>`
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
    ${({ isMobile }) => isMobile ?
        `overflow-x: scroll;
         width: 100%;`
        : 'width: 100%;'
    }
`

const InternalCol = styled.div`
    margin: 7px;
    padding-block: 5px;
    height: auto;
    border: solid 1px transparent;


    :hover:not([disabled]) {
        border: solid 1px ${({ theme }) => theme.loader};
    }
`

const Col = styled.button`
    flex: 4;
    width: 100%;
    height: auto;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    padding: 5px;

    :hover:not([disabled]) {
        z-index: 1;
        box-shadow: 1px 2px 6px 6px #b4b2b2;
        background: ${({ theme }) => theme.surface}
    }
`

const Link = styled.div`
  text-decoration-line: underline;
  font-family: 'Inter', sans-serif;
  font-size: ${FONT_SIZE.SM};
  font-weight: 100;

  ::after {
    content: "↗";
    font-size: 0.875em;
  }
`

export default OtherResources