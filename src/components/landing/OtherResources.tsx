import styled from 'styled-components'
import ExternalLink from '../ExternalLink'
import { FONT_SIZE } from '../../constants'
import Shield from '../../assets/shield.svg'
import { Trans, useTranslation } from 'react-i18next'
import OpenFlower from '../../assets/open-flower.svg'
import OpenHugFlower from '../../assets/open-hug-flower.svg'
import ClosedHugFlower from '../../assets/closed-hug-flower.svg'

const OtherResources = () => {
    useTranslation()
    return (
    <Row>
        <Col initialCol={true}>
            <Link href="https://ceremony.ethereum.org">
                <Trans i18nKey="otherResources.ipfs">
                    IPFS
                </Trans>
                { " " }
            </Link>
            <img src={ClosedHugFlower} alt="closed hug flower icon"/>
        </Col>
        <Col>
            <Link href="https://ceremony.ethereum.org">
                <Trans i18nKey="otherResources.hosted">
                    Hosted Interface
                </Trans>
                { " " }
            </Link>
            <img src={OpenFlower} alt="open flower icon"/>
        </Col>
        <Col>
            <Link href="https://github.com/ethereum/kzg-ceremony#client-implementations">
                <Trans i18nKey="otherResources.otherClients">
                    Other Clients
                </Trans>
                { " " }
            </Link>
            <img src={OpenHugFlower} alt="open hug flower icon"/>
        </Col>
        <Col >
            <Link href="https://github.com/ethereum/kzg-ceremony-specs">
                <Trans i18nKey="otherResources.writeYourOwn">
                    Write your Own!
                </Trans>
                { " " }
            </Link>
            <img src={Shield} alt="shield icon"/>
        </Col>
    </Row>
    )
}

const Row = styled.div`
    display: flex;
    margin-block: 30px;

    width: 590px;
`
const Col = styled.div<{initialCol?: boolean}>`
    flex: 3;
    border: double 4px ${({ theme }) => theme.loader};
    border-left: ${({ theme, initialCol }) =>
    initialCol ? 'double 4px ' + theme.loader : 'none'};
    text-align: center;
    padding-block: 10px;

    :hover:not([disabled]) {
        box-shadow: 1px 2px 6px 6px #b4b2b2;
    }
`

const Link = styled(ExternalLink)`
  text-decoration-line: underline;
  font-family: 'Inter', sans-serif;
  font-size: ${FONT_SIZE.SM};
  font-weight: 100;
`

export default OtherResources