import { render, screen } from '../test-utils'
import { describe, it, expect } from 'vitest'

describe('Test Setup', () => {
  it('renders without errors', () => {
    const TestComponent = () => <div data-testid="test">Hello World</div>
    render(<TestComponent />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  it('has access to jest-dom matchers', () => {
    const TestComponent = () => <div className="test-class">Test</div>
    render(<TestComponent />)
    expect(screen.getByText('Test')).toHaveClass('test-class')
  })
})
