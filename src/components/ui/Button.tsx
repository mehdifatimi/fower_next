import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-brand-sage-dark text-brand-cream hover:bg-brand-sage',
            secondary: 'bg-brand-rose text-brand-sage-dark hover:bg-brand-rose-dark',
            outline: 'border-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-brand-cream',
            gold: 'bg-brand-gold text-white hover:bg-brand-gold-muted',
            ghost: 'text-brand-sage hover:bg-brand-rose/10',
        };

        const sizes = {
            sm: 'px-4 py-2 text-xs',
            md: 'px-6 py-3 text-sm',
            lg: 'px-8 py-4 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-sage/50 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;
