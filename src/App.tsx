import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppContainer = styled.div`
	text-align: center;
`;

const AppHeader = styled.header`
	background-color: #282c34;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
`;

const AppLogo = styled.img`
	@media (prefers-reduced-motion: no-preference) {
		animation: ${AppLogoSpin} infinite 20s linear;
	}
	height: 40vmin;
	pointer-events: none;
`;

const AppLink = styled.a`
	color: #61dafb;
`;

function App() {
	return (
		<AppContainer>
			<AppHeader>
				<AppLogo src={require('@/logo.svg')} alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<AppLink
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</AppLink>
			</AppHeader>
		</AppContainer>
	);
}

export default App;
