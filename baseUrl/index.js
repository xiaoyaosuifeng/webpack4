
const env={
    junziqian:'h5.junziqian.test',
    ebq:'196.158.158.66'
}

const sandbox={
    junziqian:'sandbox.junziqina.com',
    ebq:'sandbox:wbq.com'
}

const pro={
    junziqian:'www.junziqian.com',
    ebq:'www.ebaoquan.org'
}

module.exports=process.env.NODE_ENV=='production'?pro:env;