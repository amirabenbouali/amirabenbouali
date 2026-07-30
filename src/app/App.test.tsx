import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { routes } from './router';
import { renderWithRouter } from '../test-utils';

describe('App routes', () => {
  it('renders the homepage observatory landing', () => {
    renderWithRouter(routes);

    expect(screen.getByRole('heading', { name: /software engineer/i })).toBeInTheDocument();
    expect(screen.getAllByText('Amira Benbouali')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /enter the observatory/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /balances engineering, clarity and thoughtful interaction/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Atria' })).toBeInTheDocument();
  });

  it('renders a project case study shell from project data', () => {
    renderWithRouter(routes, '/work/atria');

    expect(screen.getByRole('heading', { name: 'Atria' })).toBeInTheDocument();
    expect(screen.getByText(/product systems/i)).toBeInTheDocument();
  });

  it('renders the writing journal index and an article page', () => {
    renderWithRouter(routes, '/writing');

    expect(screen.getByRole('heading', { name: 'Field Notes' })).toBeInTheDocument();
    expect(screen.getByText(/Thoughts on software, design and building things/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Why every calendar app overwhelms me/i })).toBeInTheDocument();
  });
});
