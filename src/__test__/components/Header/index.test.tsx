import { render, screen } from '@testing-library/react';
import { Header } from '../../../components/Header';
import '@testing-library/jest-dom/extend-expect';

describe('Header component', () => {
  test('renders correctly', () => {
    render(<Header />);

    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });
});
