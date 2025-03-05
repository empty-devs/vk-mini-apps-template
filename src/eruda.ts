import eruda from 'eruda';
import erudaDom from 'eruda-dom';

eruda.init({
    tool: ['Console', 'Elements', 'Network', 'Resource', 'Info'],
    defaults: {
        theme: 'Material Deep Ocean'
    }
});

eruda.add(erudaDom);

export default eruda;
